import ArticleAPI from "../services/Articles_API.js"

var Articles = function ()
{
				this._init ();
}


/**
 * _init sets all Articles attributes to their default value. Make sure to call
 * this method within your class constructor
 */
Articles.prototype._init = function ()
{
				this.m_API_obj = "";

}


