import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

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
                        <h3 className="mb-0">Forget Password?</h3>
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

                    {/* Forgot Password Form */}
                    <div className="register-form mt-5 px-3">
                        <form onSubmit={submit}>
                            <div className="form-group text-left mb-4">
                                <label htmlFor="email">
                                    <i className="lni lni-user"></i>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Username or email address"
                                    className="form-control"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <button className="btn btn-primary btn-lg w-100" disabled={processing}>
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
