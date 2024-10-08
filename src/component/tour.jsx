import React, { useEffect, useState } from 'react';

const TourSHA = () => {
    const [hashString, setHashString] = useState('');

    // Bufferni hex formatidagi stringga o'zgartirish funksiyasi
    function bufferToHex(buffer) {
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    // SHA-256 bilan hash qilish va stringga aylantirish funksiyasi
    async function sha256ToString(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);

        // SHA-256 digestini olamiz
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);

        // Bufferni hex formatidagi stringga o'tkazamiz
        return bufferToHex(hashBuffer);
    }

    useEffect(() => {
        // Asinxron hash yaratish va holatni o'rnatish
        sha256ToString('$2b$12$xoRjV2xmhv3Z.zoDWpT5Qu/f6D4hTQunXjNNotVJPvh/gbD1wJt0i')
            .then(hash => {
                setHashString(hash); // Natijani holatga saqlaymiz
            })
            .catch(error => {
                console.error('Hash yaratishda xatolik:', error);
            });
    }, []);

    return (
        <div>
            <h2>SHA-256 Hash:</h2>
            <p>{hashString}</p>
        </div>
    );
};

export default TourSHA;
