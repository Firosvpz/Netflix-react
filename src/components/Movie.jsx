import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../Context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';

const Movie = ({ item, id }) => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();

    const saveShow = async () => {
        if (user?.email) {
            setLike(!like);
            setSaved(true);

            const movieID = doc(db, 'users', `${user?.email}`);
            const docSnapshot = await getDoc(movieID);

            if (docSnapshot.exists()) {
                await updateDoc(movieID, {
                    savedShows: arrayUnion({
                        id: item.id,
                        title: item.title,
                        img: item.backdrop_path,
                    }),
                });
            } else {
                await setDoc(movieID, {
                    savedShows: [{
                        id: item.id,
                        title: item.title,
                        img: item.backdrop_path,
                    }],
                });
            }
        } else {
            alert('Please log in to save movies');
        }
    };

    return (
        <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 '>
            <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt={item?.title} />
            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:opacity-100 opacity-0 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.title}</p>
                <p onClick={saveShow} className='absolute top-4 left-4'>
                    {like ? <FaHeart className='text-gray-300' /> : <FaRegHeart />}
                </p>
            </div>
        </div>
    );
};

export default Movie;
