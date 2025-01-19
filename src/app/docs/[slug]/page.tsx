"use server"
import { DocNames } from "../docs";

export default async function Page({ params }) {

	const slug = (await params).slug;
	console.log(slug)

	const NewDoc = DocNames['Adding New Documentation'];
	const Laser = DocNames['Laser Cutter'];

	if (slug == "AddingNewDocumentation") return (<NewDoc />)

	if (slug == "LaserCutter") return <Laser />

	throw "what happened??"
}
