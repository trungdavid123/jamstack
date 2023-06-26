import { fetcher } from '@/lib/api';
import Link from 'next/link';
import { setToken, unsetToken } from '../lib/auth';
import { useState } from 'react';
import { useUser } from '@/lib/authContext';


const Nav = () => {
    const [data, setData] = useState({
        identifier: '',
        password: ''
    });

    const { user, loading } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                identifier: data.identifier,
                password: data.password
            })
        });

        setToken(payload)
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const logout = () => {
        unsetToken();
    }

    return (
        <nav className="flex flex-wrap items-center justify-between w-full py-4 md:px-4 text-lg text-gray-700 bg-white">
            <div>
                <Link href="/" passHref>
                    <img className="m-3" src="https://d2zv2ciw0ln4h1.cloudfront.net/uploads/nasa_cf7e56179f.svg" width={200} height={50} alt="Strapi Logo" />
                </Link>
            </div>
            <div className='flex gap-5'>
                <Link href="/" passHref>
                    Home
                </Link>
                <Link href="/films" passHref>
                    Films
                </Link>
                {!loading && (
                    user ? (
                        <Link href="/profile" className="md:p-2 py-2 block hover:text-purple-400">
                            Profile
                        </Link>
                    ) : (
                        ''
                    )
                )}
                {!loading &&
                    (user ? (
                        <li>
                            <p
                                className="md:p-2 py-2 block hover:text-purple-400"
                                onClick={logout}
                                style={{ cursor: 'pointer' }}
                            >
                                Logout
                            </p>
                        </li>
                    ) : (
                        ''
                    ))}
                {!loading && !user ? (
                    <>
                        <li>
                            <form onSubmit={handleSubmit} className="form-inline">
                                <input
                                    type="text"
                                    name="identifier"
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className="md:p-2 form-input py-2 rounded mx-2"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="md:p-2 form-input py-2 rounded mx-2"
                                    required
                                />

                                <button
                                    className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </form>
                        </li>
                        <li>
                            <Link href="/register" className="md:p-2 block py-2 hover:text-purple-400 text-black">

                                Register

                            </Link>
                        </li>
                    </>
                ) : (
                    ''
                )}
            </div>
        </nav>
    )
}

export default Nav; 