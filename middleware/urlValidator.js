import isUrl from "is-url";

const createUrlValidator = (req, res, next) => {

  const body = req.body;
  const  url= body.url
  const result = isUrl(url);
  console.log(url)
  console.log(result)

  if (!result) {
    res.status(400).json({ errors: "This link is invalid. Please input a valid url" });
    return;
  }

  next();
};

export default createUrlValidator;