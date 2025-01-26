TypeError: (0 , _hooks_useRegister__WEBPACK_IMPORTED_MODULE_3__.default) is not a function

This error happened while generating the page. Any console logs will be displayed in the terminal window.
Source
src\components\RegisterModal\index.jsx (7:69) @ setIsOpen

   5 |
   6 | export const RegisterModal = ({ isOpen, setIsOpen }) => {
>  7 |   const { formData, setFormData, handleFormRegister } = useRegister(setIsOpen);
     |                                                                     ^
   8 |   const [showPassword, setShowPassword] = useState(false);
   9 |   return (
  10 |     <AnimatePresence>