import requests
import logging

# --- Configuration ---
# The URL of the application you want to check.
# You can change this to any URL.
APPLICATION_URL = "https://www.google.com"

# --- Logging Setup ---
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

def check_application_status(url):
    """
    Checks the status of a web application by sending an HTTP GET request.

    Args:
        url (str): The URL of the application to check.
    """
    try:
        # Send a GET request to the URL with a timeout of 5 seconds.
        response = requests.get(url, timeout=5)
        
        # Check the HTTP status code from the response.
        # A status code in the 200-299 range indicates success.
        if 200 <= response.status_code < 300:
            logging.info(f"Application is UP. Status Code: {response.status_code}")
            return "UP"
        else:
            # Any other status code indicates a potential issue.
            logging.error(f"Application is DOWN. Status Code: {response.status_code}")
            return "DOWN"

    except requests.exceptions.RequestException as e:
        # This block catches network-related errors, like connection errors, timeouts, etc.
        logging.error(f"Application is DOWN. Could not connect to the URL. Error: {e}")
        return "DOWN"

def main():
    """
    Main function to run the application health check.
    """
    logging.info(f"--- Checking status of application at {APPLICATION_URL} ---")
    status = check_application_status(APPLICATION_URL)
    print(f"Final Status for {APPLICATION_URL}: {status}")
    logging.info("--- Application Health Check Finished ---")


if __name__ == "__main__":
    main()
