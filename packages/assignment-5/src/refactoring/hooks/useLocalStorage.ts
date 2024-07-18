import { useState, useEffect } from 'react';

function useLocalStorage(key: any, initialValue: any) {
    // 로컬 스토리지에서 값을 가져오는 함수
    const getStoredValue = () => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    };

    // 상태 초기화
    const [storedValue, setStoredValue] = useState(getStoredValue);

    // 값을 설정하고 로컬 스토리지에 저장하는 함수
    const setValue = (value: any) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // 로컬 스토리지의 변경사항을 감지하여 상태 업데이트
        const handleStorageChange = () => {
            setStoredValue(getStoredValue());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return [storedValue, setValue];
}

export default useLocalStorage;