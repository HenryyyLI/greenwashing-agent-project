import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import useContext from '../zustand/useContext';

const useGetHistory = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const { history, setHistory } = useContext();

    const userId = authUser?._id;

    useEffect(() => {
        const getHistory = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/file/history/${userId}`);

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                // console.log(data);

                setHistory(data);

            } catch (err) {
                toast.error(err.message)
            } finally {
                setLoading(false)
            }
        }

        if(userId) getHistory();

    }, [userId, setHistory]);

    return { loading, history }
}

export default useGetHistory

