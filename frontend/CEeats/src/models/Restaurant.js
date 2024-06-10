#include "Restaurant_API.js"
#include "commandes.js"
#include "categorie.js"

Restaurant = function ()
{
				this._init ();
}


/**
 * _init sets all Restaurant attributes to their default value. Make sure to call
 * this method within your class constructor
 */
Restaurant.prototype._init = function ()
{
				this.m_API_obj = "";
				this.m_commandes_enregistrees = "";
				this.m_categorie = "";

}


