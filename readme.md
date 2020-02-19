## Example Mini-Project with Express

Berikut adalah simple **Mini project** Sistem Akademik Sekolah studi kasus from [kraken47](https://bit.ly/326ShGb) and [Praxis Academy](https://pandao.github.io/editor.md/en.html)

#### Cara Menjalankan:
- install semua module dengan mengetikan `npm install` pada terminal
- jalankan dengan mengetik `npm run dev` atau `yarn run dev` pada terminal

#### Features:

- [x] **Login and Register**
- [x] **Forgot and Reset Password**
- [x] **Activation Token Login with Sendgrind Email**
- [x] **Resend Token Activation**
- [x] **Automatic Expired Token login**
- [x] **Automatic Random Token Activation**
- [x] **Encryption Password**
- [x] **Custome Message Error and Success**
- [x] **Custome Email Template and Reset Password Template**
- [x] **Auth with JWT and Auth with Role Permission**
- [x] **Service Worker Multi Tread Core**
- [x] **Any More**

#### Endpoits:

| Name | Route Name | Request Method |
| ----------------------- | ------------------|
|  Register                    | http://localhost:3000/register | POST
|  Login                    | http://localhost:3000/login | POST
|  Activation   Token                 | http://localhost:3000/activation  | GET
|  Resend Token                    | http://localhost:3000/resendtoken  | GET
| Forgot Password    |  http://localhost:3000/forgotpassword | POST
| Reset Password      | http://localhost:3000/resetpassword | POST
|  **User Create**                   | http://localhost:3000/user/create | **POST**
|  User Results                  | http://localhost:3000/user/results | GET
|  User Result              | http://localhost:3000/user/result/:id | GET
|  User Delete                   | http://localhost:3000/user/delete/:id | DELETE
|  User Update                | http://localhost:3000/user/update/:id | PUT
|  **Role Create**                   | http://localhost:3000/role/create | **POST**
|  Role Results                  | http://localhost:3000/role/results  | GET
|  Role Result                  | http://localhost:3000/role/result/:id  | GET
|  Role Delete             | http://localhost:3000/role/delete/:id | DELETE
|  Role Update              | http://localhost:3000/role/update/:id | PUT
|  **Subject Create**              | http://localhost:3000/subject/create | **POST**
|  Subject Results              | http://localhost:3000/role/subject/results | GET
|  Subject Result             | http://localhost:3000/role/subject/result/:id  | GET
|  Subject Delete              | http://localhost:3000/role/subject/delete/:id | DELETE
|  Subject Update           | http://localhost:3000/role/subject/update/:id  | PUT
|  **Credit Create**              | http://localhost:3000/credit/create | **POST**
|  Credit Results              | http://localhost:3000/role/credit/results  | GET
|  Credit Result             | http://localhost:3000/role/credit/result/:id | GET
|  Credit Delete              | http://localhost:3000/role/credit/delete/:id | DELETE
|  Credit Update           | http://localhost:3000/role/credit/update/:id  | PUT