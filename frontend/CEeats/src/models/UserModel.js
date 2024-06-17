export default class User {
    constructor(id, nom, prenom, email, role_id, date_anniv, password, telephone, is_notified, path_pfp, id_parain, adresse, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.role_id = role_id;
        this.date_anniv = date_anniv;
        this.password = password;
        this.telephone = telephone;
        this.is_notified = is_notified;
        this.path_pfp = path_pfp;
        this.id_parain = id_parain;
        this.adresse = adresse;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}