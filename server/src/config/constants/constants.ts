/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

class Constants {
    static DB_CONNECTION_STRING: string = process.env.NODE_ENV === 'production' ? process.env.dbURI : "mongodb://user:pass@ds149030.mlab.com:49030/starter-db"
}
Object.seal(Constants);
export = Constants;