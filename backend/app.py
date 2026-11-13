

from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class TicketHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "healthy",
                "service": "Support Ticket Backend",
                "server": "EC2"
            }).encode())
        else:
            self.send_error(404)

server = HTTPServer(("0.0.0.0", 5000), TicketHandler)
print("Support Ticket Backend running on port 5000")
server.serve_forever()
