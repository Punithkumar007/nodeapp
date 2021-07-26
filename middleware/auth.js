import jwt from "jsonwebtoken";

// custom middle ware
export const auth = (request, response, next) => {
  // Authorizatoin | x-auth-token
  try {
    const token = request.header("x-auth-token");
    console.log(token);
    jwt.verify(token, process.env.SECRECT_KEY); // if does not match throws error
    next();
  } catch (err) {
    response.status(401); // 200 ok  401
    response.send({ err: err.message });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> e4db9ba8ef6545869dfea68bdea26ccabaa79f3b
