export default class Router{
  asRouter = async (req, res, next) => {
    // return 'Me';
    const preResponse = { data: null, message: "Successfull!", error_message: null, status: 200, error: {} };
    try {
      if (typeof(this?.[req.method.toLowerCase()])==='function') {
        let response;

        // applying midleware
        if (!Array.isArray(this.midleware) && typeof (this.midleware) === 'object') {
          if (Array.isArray(this.midleware[req.method.toLowerCase()])) {
            for (let mid of this.midleware[req.method.toLowerCase()]) {
              if (typeof (mid) === 'function' && await mid(req, res, next) === undefined)
                return;
            }
          } else if (typeof (this.midleware[req.method.toLowerCase()]) === 'function' && await this.midleware[req.method.toLowerCase()](req, res, next) === 'function')
            return;
        } else if (Array.isArray(this.midleware)) {
          for (let mid of this.midleware) {
            if (typeof (mid) === 'function' && await mid(req, res, next) === undefined)
            return;
          }
        } else if (typeof (this.midleware) === 'function' && await this.midleware(req, res, next) === 'undefined')
        return;
        
        // console.log("In router>>>\t",req,res,next);
        // console.log('response>>\t', typeof(this.midleware), Array.isArray(this.midleware));

        console.log("this is in router");
        return "This is me";
        res.status(200).json({ ...preResponse });
        
        response = await this[req.method.toLowerCase()](req, res, next);
        if (typeof (response) === "object" && response.data) res.status(response.status || 200).json({ ...preResponse, response });
        else if (response === null) res.status(201).json(preResponse);
        else {
          const err = new Error('Invalid response type. Reponse must be object and must have data key');
          next(err);
        }
      } else {
        const errr = new Error('Method not Allowed');
        err.status = 405
        next(err);
      }
    } catch (e) {
      next(e);
    }
  }
}