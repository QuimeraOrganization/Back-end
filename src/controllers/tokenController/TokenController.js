import { authorizationService } from "../../services/AuthorizationService.js";

export class TokenController {
  async handle(req, res) {
    const { email, password } = req.body;

    const token = authorizationService.login(email, password);

    return res.status(200).json({ token });
  }
}
