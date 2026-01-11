import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import CustomerBackground from '../../components/backgrounds/CustomerBackground';
import TableSelector from '../../components/custom/TableSelector';
import { CallType, CallStatus } from '../../types/callTypes';
import type { ICallService } from '../../services/callServiceInterface';
import { firebaseCallService } from '../../services/firebaseCallService';
import { customerPageVariants } from '../../constants/animationVariants';
import { callRateLimiter } from '../../utils/rateLimiter';

interface CustomerPageProps {
  service?: ICallService;
}

function CustomerPage({ service = firebaseCallService }: CustomerPageProps) {
  const [selectedTable, setSelectedTable] = useState('');
  const navigate = useNavigate();

  const buttons = [
    { label: 'Garson Çağır', action: CallType.WAITER_CALL },
    { label: 'Sipariş Ver', action: CallType.ORDER },
    { label: 'Hesap İste', action: CallType.CHECK_REQUEST },
  ];

  const handleAction = async (action: string) => {
    if (!selectedTable) {
      alert('Lütfen bir masa seçin!');
      return;
    }

    if (!callRateLimiter.canMakeRequest(selectedTable)) {
      const remaining = callRateLimiter.getRemainingRequests(selectedTable);
      alert(`Çok fazla istek gönderildi. Lütfen bir dakika bekleyin. (Kalan: ${remaining})`);
      return;
    }

    try {
      await service.createCall({
        table: selectedTable,
        type: action,
        status: CallStatus.PENDING
      });

      navigate('/onay', { state: { action, table: selectedTable } });
    } catch (error) {
      console.error('Error creating call:', error);
      alert('Çağrı oluşturulurken bir hata oluştu.');
    }
  };

  return (
    <CustomerBackground>
      <motion.div
        className="flex flex-col items-center justify-center gap-8 sm:gap-16 w-full max-w-125 px-4"
        variants={customerPageVariants.container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-7xl sm:text-7xl md:text-[8rem] text-white font-['Kelly_Slab'] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)] m-0 leading-tight text-center"
          variants={customerPageVariants.title}
        >
          NOOK
        </motion.h1>

        <motion.div
          className="w-full flex justify-center"
          variants={customerPageVariants.selector}
        >
          <TableSelector
            value={selectedTable}
            onChange={setSelectedTable}
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 sm:gap-5 w-full max-w-87.5 sm:max-w-87.5 justify-center items-center"
          variants={customerPageVariants.buttonContainer}
        >
          {buttons.map((button) => (
            <motion.div
              key={button.action}
              className="w-full flex justify-center"
              variants={customerPageVariants.button}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                label={button.label}
                onClick={() => handleAction(button.action)}
                variant="glassmorphism"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </CustomerBackground>
  );
}

export default CustomerPage;

