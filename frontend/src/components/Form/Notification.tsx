import { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isVisible) {
    return null;
  }

  return (
   <div
      className={`fixed bottom-4 left-4 rounded bg-gray-900 px-4 py-2 text-white ${
        isVisible ? 'block' : 'hidden'
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
