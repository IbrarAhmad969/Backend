class ApiResponse {
  constructor(success, message = "success", data) {
    this.success = success<400;
    this.message = message;
    this.data = data;
  }
}