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
        const queryCopy = {...this.queryStr}

        // remove from search 
        const removeFeilds = ["keyword", "page", "limit"] //limit you will understand later
        removeFeilds.forEach(key=>delete queryCopy[key]);
         //filter for price
        let queryStr = JSON.stringify(queryCopy) 
        
        //Don't know what this is but it is something related to regular expression
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        //finding filtered elements
        this.query = this.query.find(queryCopy);
   

        return this
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