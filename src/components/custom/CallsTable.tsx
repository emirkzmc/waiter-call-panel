import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Call } from '../../types/callTypes';
import { CallStatus } from '../../types/callTypes';
import { getStatusColor, getStatusLabel } from '../../constants/callStatusConstants';
import { sortCalls } from '../../utils/callHelpers';
import type { ICallService } from '../../services/callServiceInterface';
import { firebaseCallService } from '../../services/firebaseCallService';
import { callCleanupService } from '../../services/callCleanupService';
import ConfirmationModal from './ConfirmationModal';
import { waiterPageVariants } from '../../constants/animationVariants';
import { TableLayout, TableLayoutHeader, TableLayoutBody, TableLayoutRow, TableLayoutCell } from '../ui/TableLayout';
import Button from '../ui/Button';

interface CallsTableProps {
    service?: ICallService;
}

export default function CallsTable({ service = firebaseCallService }: CallsTableProps) {
    const [calls, setCalls] = useState<Call[]>([]);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [callToCancel, setCallToCancel] = useState<string | null>(null);

    useEffect(() => {
        callCleanupService.cleanupOldCalls().catch(error => {
            console.error('Failed to cleanup old calls:', error);
        });

        const unsubscribe = service.subscribeToCallsUpdates((updatedCalls) => {
            setCalls(updatedCalls);
        });

        return () => unsubscribe();
    }, [service]);

    const sortedCalls = useMemo(() => sortCalls(calls), [calls]);

    const updateStatus = async (id: string, newStatus: CallStatus) => {
        try {
            await service.updateCallStatus(id, newStatus);
        } catch (error) {
            console.error('Error updating call status:', error);
        }
    };

    const handleCancelClick = (id: string) => {
        setCallToCancel(id);
        setShowCancelConfirm(true);
    };

    const confirmCancel = async () => {
        if (callToCancel) {
            await updateStatus(callToCancel, CallStatus.CANCELLED);
        }
        setShowCancelConfirm(false);
        setCallToCancel(null);
    };

    const cancelCancelation = () => {
        setShowCancelConfirm(false);
        setCallToCancel(null);
    };


    return (
        <>
            <TableLayout className="h-full flex flex-col font-['Kelly_Slab']">
                <TableLayoutHeader>
                    <TableLayoutRow className="grid grid-cols-4 py-3">
                        <TableLayoutCell align="center" className="text-2xl font-bold text-gray-800">Masa</TableLayoutCell>
                        <TableLayoutCell align="center" className="text-2xl font-bold text-gray-800">Çağrı Tipi</TableLayoutCell>
                        <TableLayoutCell align="center" className="text-2xl font-bold text-gray-800">Durum</TableLayoutCell>
                        <TableLayoutCell align="center" className="text-2xl font-bold text-gray-800">Aksiyon</TableLayoutCell>
                    </TableLayoutRow>
                </TableLayoutHeader>

                <TableLayoutBody>
                    <motion.div
                        className="h-full overflow-y-auto p-2 flex flex-col gap-2"
                        initial="hidden"
                        animate="visible"
                        variants={waiterPageVariants.tableContainer}
                    >
                        {sortedCalls.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-gray-500 text-xl">
                                Henüz çağrı yok.
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {sortedCalls.map((call) => (
                                    <motion.div
                                        key={call.id}
                                        layout
                                        variants={waiterPageVariants.tableRow}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <TableLayoutRow className={`grid grid-cols-4 items-center p-3 rounded-xl shadow-sm transition-all ${getStatusColor(call.status)}`}>
                                            <TableLayoutCell align="center" className="text-xl font-medium">{call.table}</TableLayoutCell>
                                            <TableLayoutCell align="center" className="text-xl">{call.type}</TableLayoutCell>
                                            <TableLayoutCell align="center" className="text-xl">{getStatusLabel(call.status)}</TableLayoutCell>
                                            <TableLayoutCell align="center" className="flex justify-center gap-2">
                                                {call.status === CallStatus.PENDING && (
                                                    <>
                                                        <Button
                                                            label="Üstlen"
                                                            onClick={() => updateStatus(call.id, CallStatus.ACCEPTED)}
                                                            variant="primary"
                                                        />
                                                        <Button
                                                            label="İptal"
                                                            onClick={() => handleCancelClick(call.id)}
                                                            variant="danger"
                                                        />
                                                    </>
                                                )}
                                                {call.status === CallStatus.ACCEPTED && (
                                                    <Button
                                                        label="Tamamlandı"
                                                        onClick={() => updateStatus(call.id, CallStatus.COMPLETED)}
                                                        variant="success"
                                                        className="w-full max-w-35"
                                                    />
                                                )}
                                                {call.status === CallStatus.COMPLETED && (
                                                    <span className="text-green-700 font-bold text-xl">✓</span>
                                                )}
                                                {call.status === CallStatus.CANCELLED && (
                                                    <span className="text-red-700 font-bold text-xl">✗</span>
                                                )}
                                            </TableLayoutCell>
                                        </TableLayoutRow>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </motion.div>
                </TableLayoutBody>
            </TableLayout>

            <ConfirmationModal
                show={showCancelConfirm}
                title="Emin misiniz?"
                message="Bu çağrıyı iptal etmek istediğinizden emin misiniz?"
                onConfirm={confirmCancel}
                onCancel={cancelCancelation}
                confirmText="Evet"
                cancelText="Hayır"
            />
        </>
    );
}
