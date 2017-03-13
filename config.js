exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/api-capstone-bookshelf' :
                            'mongodb://localhost/api-capstone-bookshelf');
exports.PORT = process.env.PORT || 5000;