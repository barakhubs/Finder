import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Header title='Login'/>

            <div className="login-wrapper d-flex align-items-center justify-content-center">
                {/* Shape */}
                <div className="login-shape">
                    <img src="img/core-img/login.png" alt="" />
                </div>
                <div className="login-shape2">
                    <img src="img/core-img/login2.png" alt="" />
                </div>

                <div className="container">
                    {/* Login Text */}
                    <div className="login-text text-center">
                        <img className="login-img" src="img/bg-img/12.png" alt="" />
                        <h3 className="mb-0">Welcome Back!</h3>
                        {/* Shapes */}
                        <div className="bg-shapes">
                            <div className="shape1"></div>
                            <div className="shape2"></div>
                            <div className="shape3"></div>
                            <div className="shape4"></div>
                            <div className="shape5"></div>
                            <div className="shape6"></div>
                            <div className="shape7"></div>
                            <div className="shape8"></div>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="register-form mt-5 px-3">
                        <form onSubmit={submit}>
                            <div className="form-group text-left mb-4">
                                <label htmlFor="email">
                                    <i className="lni lni-user"></i>
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="form-control"
                                    placeholder="Username or email"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="form-group text-left mb-4">
                                <label htmlFor="password">
                                    <i className="lni lni-lock"></i>
                                </label>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="form-control"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <button className="btn btn-primary btn-lg w-100" disabled={processing}>
                                Log in
                            </button>
                        </form>
                    </div>

                    {/* Login Meta */}
                    <div className="login-meta-data text-center">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="forgot-password d-block mt-3 mb-1"
                            >
                                Forgot Password?
                            </Link>
                        )}
                        <p className="mb-0">
                            Didn't have an account?{' '}
                            <Link href={route('register')} className="ml-2">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
