import CategorieAPI from "../services/Categorie_API.js"

let categorie = function ()
{
				this._init ();
}


/**
 * _init sets all categorie attributes to their default value. Make sure to call
 * this method within your class constructor
 */
categorie.prototype._init = function ()
{
				this.m_API_obj = "";

}


module.exports = categorie