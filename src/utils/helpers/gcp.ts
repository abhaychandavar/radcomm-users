import { CloudTasksClient, protos } from '@google-cloud/tasks';

class GCPHelper {
    private client: CloudTasksClient;
    private project: string;
    private region: string;

    constructor({ project, region }: { project: string, region: string }) {
        this.client = new CloudTasksClient();
        this.project = project;
        this.region = region;
    }

    private getScheduleTime(date: Date): protos.google.protobuf.ITimestamp {
    const seconds = Math.floor(date.getTime() / 1000);
    const nanos = (date.getTime() % 1000) * 1e6; // Convert remaining milliseconds to nanoseconds
    
    return {
        seconds: seconds,
        nanos: nanos
    };
    }

    createTask = async ({
        queueName,
        payload,
        callbackUrl,
        scheduleTime,
        taskName
    }: {
        queueName: string,
        payload: string,
        callbackUrl: string,
        scheduleTime?: Date,
        taskName?: string
    }) => {
        const data = await this.client.createTask({
            parent: this.client.queuePath(this.project, this.region, queueName),
            task: {
                httpRequest: {
                  httpMethod: 'POST',
                  url: callbackUrl,
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: String(payload),
                },
                name: taskName,
                scheduleTime: scheduleTime ? this.getScheduleTime(scheduleTime) : undefined,
              }
        });
        return data[1]?.task?.name;
    }
}

export default GCPHelper;