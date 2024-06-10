#include "User_API.js"
#include "Panier.js"

User = function ()
{
				this._init ();
}


/**
 * _init sets all User attributes to their default value. Make sure to call this
 * method within your class constructor
 */
User.prototype._init = function ()
{
				this.m_API_obj = "";
				this.m_panier = "";
				this.m_nom = "";
				this.m_prenom = "";
				this.m_adresse = "";
				this.m_num_tel = "";

}


