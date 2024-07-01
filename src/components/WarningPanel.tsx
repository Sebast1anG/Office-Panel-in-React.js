import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import React from 'react';

const WarningPanel = () => {
    const { extendSession, logout, showWarning } = useAuth();
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (showWarning) {
            setCountdown(10);
            timer = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown === 1) {
                        clearInterval(timer);
                        logout();
                        return 0;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [showWarning, logout]);

    const handleExtendSession = () => {
        extendSession();
        setCountdown(10);
    };

    if (!showWarning) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <p className="mb-4">
                    Your session is about to expire in {countdown} seconds. Do you want to extend your session?
                </p>
                <button
                    onClick={handleExtendSession}
                    className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                >
                    Yes
                </button>
                <button
                    onClick={logout}
                    className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    No
                </button>
            </div>
        </div>
    );
};

export default WarningPanel;
