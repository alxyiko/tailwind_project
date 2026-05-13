import React from 'react';

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReusableModal: React.FC<ReusableModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl animate-bounce">
        <h2 className="text-2xl font-bold mb-4 text-center">🎉 You Caught Scuba Cat! 🎉</h2>
        <p className="text-gray-700 text-center mb-6">You're too fast! But I'll escape again!</p>
        <button 
          onClick={onClose}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ReusableModal;