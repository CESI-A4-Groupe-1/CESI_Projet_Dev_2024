import CommandesAPI from "../services/Commandes_API.js"
import Articles from "./Articles.js"

let Commandes = function ()
{
				this._init ();
}


/**
 * _init sets all commandes attributes to their default value. Make sure to call
 * this method within your class constructor
 */
Commandes.prototype._init = function ()
{
				this.m_API_obj = "";
				this.m_articles = "";

}


module.exports = Commandes