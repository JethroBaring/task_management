const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-r from-slate-100 to-slate-200'>
      {children}
    </div>
  );
};

export default AuthLayout