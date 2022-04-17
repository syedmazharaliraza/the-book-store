import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin user",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    billingAddress: {
      address: null,
      city: null,
      state: null,
      pincode: null,
      phoneNumber: 9818664478,
      landmark: null,
    },
  },
  {
    name: "User 1",
    email: "user1@example.com",
    password: bcrypt.hashSync("123456", 10),
    billingAddress: {
      address: null,
      city: null,
      state: null,
      pincode: null,
      phoneNumber: 9818664478,
      landmark: null,
    },
  },
  {
    name: "User 2",
    email: "user2@example.com",
    password: bcrypt.hashSync("123456", 10),
    billingAddress: {
      address: null,
      city: null,
      state: null,
      pincode: null,
      phoneNumber: 9818664478,
      landmark: null,
    },
  },
];

export default users;
