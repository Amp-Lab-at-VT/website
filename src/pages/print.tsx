import { Text } from "@mantine/core";
import Link from "next/link";

export default function Print() {
    return (
        <>
            <h1>Submit Your Files Below</h1>
            <Text>
                Submit your files below to be printed. You will be notified when
                your files are ready to be picked up.
            </Text>
            <div className="App-iframe">
                {/* Give me a button for a link */}
                <Link href="https://github.com/Amp-Lab-at-VT/print-queue/issues/new?assignees=octocat&labels=3d-print&template=3d_print.yml&title=%5B3d-print%5D%3A+">
                    Click here to Submit a Request Through Github
                </Link>
            </div>
        </>
    );
}
