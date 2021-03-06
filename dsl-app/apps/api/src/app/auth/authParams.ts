import { 
  Request, 
  Response, 
  NextFunction 
} from "express";

const verifyIdParam = (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id.match(/^[0-9]*$/)) {
    return res.status(404).json('Wrong id format. Try again.');
  }
  next();
};

const verifyCodeClassIdParams = (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.codeId.match(/^[0-9]*$/) || !req.params.classId.match(/^[0-9]*$/)) {
    return res.status(404).json('Wrong id format. Try again.');
  }
  next();
}
const verifyCodeStudentIdParams = (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.codeId.match(/^[0-9]*$/) || !req.params.studentId.match(/^[0-9]*$/)) {
    return res.status(404).json('Wrong id format. Try again.');
  }
  next();
}

const verifyCodeStringParam = (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.codeString.match(/^[0-9a-zA-Z]*$/)) {
    return res.status(404).json('Wrong code string format. Try again.');
  }
  next();
}

const authParams = {
  verifyIdParam,
  verifyCodeClassIdParams,
  verifyCodeStringParam,
  verifyCodeStudentIdParams,
};

export default authParams;
  