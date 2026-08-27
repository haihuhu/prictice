// import { useForm } from 'react-hook-form';

// interface ClerkUserFormProps {
//   label: string;
//   text: string;
// }

// const ClerkUserForm = ({ label, text }: ClerkUserFormProps) => {
//   const {
//     register,

//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data: { name: string; email: string; password: string }) => {
//     console.log(data);
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label htmlFor="name">{label}</label>
//           <input type="text" id="name" {...register('name')} />
//           {errors.name && <p>{errors.name.message}</p>}
//         </div>
//       </form>
//     </>
//   );
// };
// export default ClerkUserForm;
