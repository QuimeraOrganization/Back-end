// Midleware para setar o limite minimo de itens na paginação
export default async function (req, res, next) {
  if (req.query.size <= 10) {
    req.query.size = 10;
  }
  next();
}