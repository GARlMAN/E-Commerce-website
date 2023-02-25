class apiFeatures{
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }
    //search products using the first few letters
    search (){
        //finding keyword from qurery if it exists
        const keyword = this.queryStr.keyword 
        ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: "i" 
            }
        }:{};
        // console.log({...keyword})
        this.query = this.query.find({...keyword});
        return this;
    }

    //filter products using the different filters
    filter(){
        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
    
        removeFields.forEach((key) => delete queryCopy[key]);
    
        // Filter For Price and Rating
    
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    
        this.query = this.query.find(JSON.parse(queryStr));
    
        return this;
    }
    //find the right page and skip elements in that page
    pagination(resultPerPage){
        const currentPage = this.queryStr.page || 1;
        const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports = apiFeatures;