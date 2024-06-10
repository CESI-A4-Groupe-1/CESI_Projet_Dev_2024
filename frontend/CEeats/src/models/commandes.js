#include "Commandes_API.js"
#include "Articles.js"

commandes = function ()
{
				this._init ();
}


/**
 * _init sets all commandes attributes to their default value. Make sure to call
 * this method within your class constructor
 */
commandes.prototype._init = function ()
{
				this.m_API_obj = "";
				this.m_articles = "";

}


