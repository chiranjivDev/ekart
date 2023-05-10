import bcrypt from 'bcryptjs';

const users=[
    {
        name:'Admin User',
        email:'admin@gmail.com',
        isAdmin:true,
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name:'John Doe',
        email:'john@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name:'Jane Doe',
        email:'jane@gmail.com',
        password: bcrypt.hashSync('123456', 10)
    }
];

export default users;