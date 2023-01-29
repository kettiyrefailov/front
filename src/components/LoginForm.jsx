import React from 'react';

const LoginForm = (props) => {

    const passwordOrUNameIsEmpty = () => {
        return (props.password.length == 0  || props.username.length==0)
    }

    return (

        <div className='relative w-full h-1/2 bg-zinc-400'>
            <div className='flex justify-center items-center ' >
                <form onSubmit={props.handleSubmit} className='max-w-[400px]  w-full mx-auto bg-white p-8 mt-1'>
                    <h2 className='text-4xl font-bold text-center py-4'>Login</h2>
                    <div className='flex justify-between py-8'>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Username</label>
                        <input className='border relative bg-gray-100 p-2' type="text" value={props.username} onChange={props.usernameChange}/>
                    </div>
                    <div className='flex flex-col '>
                        <label>Password</label>
                        <input className='border relative bg-gray-100 p-2' type="password" value={props.password} onChange={props.passwordChange}/>
                    </div>
                    <button className={passwordOrUNameIsEmpty()?
                        'w-full py-3 mt-8 bg-amber-400 opacity-40 relative text-white'
                        :
                        'w-full py-3 mt-8 bg-amber-300 hover:bg-amber-200 relative text-white' }
                            disabled={passwordOrUNameIsEmpty()}
                    >Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;