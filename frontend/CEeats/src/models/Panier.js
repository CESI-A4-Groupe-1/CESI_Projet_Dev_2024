import PanierAPI from "../services/Panier_API.js"
import Articles from "./Articles.js"

var Panier = function ()
{
				this._init ();
}


/**
 * _init sets all Panier attributes to their default value. Make sure to call this
 * method within your class constructor
 */
Panier.prototype._init = function ()
{
				this.m_API_obj = "";
				this.m_articles = "";

}


