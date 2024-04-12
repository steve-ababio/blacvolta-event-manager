import Link from "next/link";

export default function NotFound(){
    return(
        <main>
            <h2>There was a problem</h2>
            <p>We could not find the page you were looking for</p>
            <p>Go back to the <Link href="/">Login page</Link></p>
        </main>
    )
}