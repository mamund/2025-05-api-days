# Task Management

## Purpose
We need to track 'Task' records in order to improve both timeliness and accuracy of customer follow-up activity.

## Data
In this first pass at the application, we need to keep track of the following data properties: 

 * **id** : a globally unique value for each record
 * **title** : the text content of the record
 * **description** : the description of the record
 * **dueDate** : the date the record is due to be completed
 * **priority** : the priority of the task
 * **assignedUser** : the user assigned to handle the task

## Actions
This edition of the application needs to support the following operations:

create tasks, update status, and mark them complete.
 * **List** : return a list of all active ToDo records in the system
 * **Create** : add a new ToDo record to the system
 * **UpdateStatus** : update the status of a single record
 * **MarkComplete** : mark a single record as completed

## Rules
None
