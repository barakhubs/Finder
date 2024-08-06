import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

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
                        <h3 className="mb-0">Welcome, Register Now!</h3>
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

                    {/* Register Form */}
                    <div className="register-form mt-5 px-3">
                        <form onSubmit={submit}>
                            <div className="form-group text-left mb-4">
                                <label htmlFor="name">
                                    <i className="lni lni-user"></i>
                                </label>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="form-control"
                                    placeholder="Username"
                                    autoComplete="name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="form-group text-left mb-4">
                                <label htmlFor="email">
                                    <i className="lni lni-envelope"></i>
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="form-control"
                                    placeholder="Email Address"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
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
                                    className="input-psswd form-control"
                                    placeholder="Password"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="form-group text-left mb-4">
                                <label htmlFor="password_confirmation">
                                    <i className="lni lni-lock"></i>
                                </label>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="input-psswd form-control"
                                    placeholder="Confirm Password"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <button className="btn btn-primary btn-lg w-100" disabled={processing}>
                                Register Now
                            </button>
                        </form>
                    </div>

                    {/* Login Meta */}
                    <div className="login-meta-data text-center mt-3">
                        <p className="mb-0">
                            Already have an account?{' '}
                            <Link href={route('login')} className="ml-2">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
