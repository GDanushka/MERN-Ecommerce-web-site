const { query } = require("express");
const { geoSearch } = require("../models/productModels");

class ApiFeatures{
    constructor(query,queryStr) {
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword ?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            },
        }
        :{};
        
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = { ...this.queryStr };
        
        //Removing some fields for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);
        
        //Filter for price and Rating
        let queryStr= JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        return this;
    }

    pagination(resultperpage){
        const currentpage= Number(this.queryStr.page) || 1;
        const skip = resultperpage * ( currentpage - 1 )
        
        this.query=this.query.limit(resultperpage).skip(skip)
        return this;
    }
}

module.exports = ApiFeatures;