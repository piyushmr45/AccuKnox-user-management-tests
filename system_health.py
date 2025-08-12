import psutil
import logging
from datetime import datetime


# Define the thresholds for alerts.
CPU_THRESHOLD = 80.0  # as a percentage
MEMORY_THRESHOLD = 80.0 # as a percentage
DISK_THRESHOLD = 80.0   # as a percentage

#  Logging Setup 
# Configure logging to print messages to the console.
# You could also configure this to write to a file like 'system_health.log'.
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

def check_cpu_usage():
    """
    Checks the current CPU usage and logs an alert if it exceeds the threshold.
    """
    # Get CPU usage over a 1-second interval.
    cpu_percent = psutil.cpu_percent(interval=1)
    if cpu_percent > CPU_THRESHOLD:
        logging.warning(f"ALERT! High CPU usage detected: {cpu_percent}%")
    else:
        logging.info(f"CPU usage is normal: {cpu_percent}%")

def check_memory_usage():
    """
    Checks the current memory usage and logs an alert if it exceeds the threshold.
    """
    memory = psutil.virtual_memory()
    memory_percent = memory.percent
    if memory_percent > MEMORY_THRESHOLD:
        logging.warning(f"ALERT! High memory usage detected: {memory_percent}%")
    else:
        logging.info(f"Memory usage is normal: {memory_percent}%")

def check_disk_space():
    """
    Checks the disk space usage for the root partition ('/') and logs an alert 
    if it exceeds the threshold.
    """
    disk = psutil.disk_usage('/')
    disk_percent = disk.percent
    if disk_percent > DISK_THRESHOLD:
        logging.warning(f"ALERT! Low disk space detected: {disk_percent}% used.")
    else:
        logging.info(f"Disk space is normal: {disk_percent}% used.")

def check_running_processes():
    """
    Logs the total number of running processes.
    """
    # Get a list of all running process IDs (PIDs).
    process_count = len(psutil.pids())
    logging.info(f"Total number of running processes: {process_count}")


def main():
    """
    Main function to run all the health checks.
    """
    logging.info("--- Starting System Health Check ---")
    check_cpu_usage()
    check_memory_usage()
    check_disk_space()
    check_running_processes()
    logging.info("--- System Health Check Finished ---")

if __name__ == "__main__":
    main()
