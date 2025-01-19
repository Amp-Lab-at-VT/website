"use client";
import { MdOutlineArticle } from "react-icons/md";
import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import { Button, Card, Center } from "@mantine/core";
import { DocNames } from "./docs";
import Link from "next/link";
import type { Route } from "next";

export default function DocsPage() {
	const names = Object.keys(DocNames) as [keyof typeof DocNames];
	return (
		<Container fluid={true}>
			<Title>Documentation</Title>
			<Text pb={"xl"}>
			Below is a list of documentation for the lab. Select one to get
            started!
			</Text>
			<SimpleGrid
				cols={{ base: 1, sm: 3, lg: 5 }}
				spacing={{ base: 10, sm: "xl" }}
				verticalSpacing={{ base: "md", sm: "xl" }}
			>
				{names.map((slug, idx) => <IconAndName
					key={idx}
					title={slug}
				/>)}
			</SimpleGrid>
		</Container>
	);
}

function IconAndName({ title }: BoxProps) {
	return (
		<Card withBorder={true}>
				<Card.Section fz={"80px"} color={"#f9f9f9"}>
					<Center pt={"sm"}>
						<MdOutlineArticle />
					</Center>
				</Card.Section>
				<Text fw={500} ta={"center"}>{title}</Text>
				<Button
					component={Link}
					color="blue"
					fullWidth={true}
					mt="md"
					radius="md"
					href={`/docs/${title.replaceAll(" ", "")}` as Route}
				>
					View Document
				</Button>
			</Card>
	);
}
type BoxProps = {
	title: keyof typeof DocNames;
	modalContent?: React.ReactNode;
};
