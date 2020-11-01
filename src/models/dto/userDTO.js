class UserDTO {
  constructor(name, email, password, uavs, missions) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.uavs = uavs;
    this.missions = missions;
  }
}

module.exports = UserDTO;
