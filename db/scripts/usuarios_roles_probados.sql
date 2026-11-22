--
-- PostgreSQL database dump
--

\restrict c5CiKkpoM1liPWdssAmcgXo9IjGisP7a8H2imNBH9ZlcxJcRQZIDKwKI272jagc

-- Dumped from database version 16.16 (Debian 16.16-1.pgdg13+1)
-- Dumped by pg_dump version 16.16 (Debian 16.16-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: parcial_user
--

INSERT INTO public.roles VALUES ('b89017e5-594a-4edb-b824-6c8cafebd6bf', 'admin', 'Administrador del sistema', '2026-11-22 02:53:04.598478', '2026-11-22 02:53:04.598478');
INSERT INTO public.roles VALUES ('0feb208b-d627-4dbf-802c-8c6475f769e6', 'supervisor', 'Supervisor', '2026-11-22 02:53:04.598478', '2026-11-22 02:53:04.598478');
INSERT INTO public.roles VALUES ('c184b7cf-d8aa-42e5-b7bb-e1fc2ce2c112', 'user', 'Usuario estándar', '2026-11-22 02:53:04.598478', '2026-11-22 02:53:04.598478');
INSERT INTO public.roles VALUES ('26fe127c-0723-4631-ae69-0708d5d6168d', 'operador', 'Registra el ingreso y la salida de vehículos', '2026-11-22 03:01:08.599434', '2026-11-22 03:01:08.599434');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: parcial_user
--

INSERT INTO public.users VALUES ('9c86dac1-d827-4bb0-a2ed-d33603c2f655', 'ana@test.com', '$scrypt$ln=17,r=8,p=1$yMhEn27ZvME3q7cqxbbOFA$2n0PKkye0JjFFKd4j0vv+dqMB1rTEJ0+HNNtPXMv96I', 'Ana', NULL, true, '2026-11-22 01:57:37.904253', '2026-11-22 01:57:37.904253');
INSERT INTO public.users VALUES ('a288ed58-0258-44ac-826b-8acb6558b8e5', 'admin@parcial.com', '$scrypt$ln=17,r=8,p=1$wrAXqytFLJGuk/N4YfgMLw$p02BbsrN2yaJmS6Sq5X3po+e2RJVy/+NNqjtFoO6860', 'Administrador', NULL, true, '2026-11-22 02:50:05.11012', '2026-11-22 02:50:05.11012');
INSERT INTO public.users VALUES ('e8bd8d61-46b1-4be3-ad0f-cddfa28aedbc', 'julian@test.com', '$scrypt$ln=17,r=8,p=1$u4gvpTcGNAT90YoVrUNYpA$LcR8pWzRVb3IzQ7fNApItVbZHo2fL9vsUSJ2xz8C17k', 'Julian', NULL, true, '2026-11-22 03:06:04.777339', '2026-11-22 03:06:04.777339');


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: parcial_user
--

INSERT INTO public.user_roles VALUES ('a288ed58-0258-44ac-826b-8acb6558b8e5', 'b89017e5-594a-4edb-b824-6c8cafebd6bf');
INSERT INTO public.user_roles VALUES ('e8bd8d61-46b1-4be3-ad0f-cddfa28aedbc', '26fe127c-0723-4631-ae69-0708d5d6168d');


--
-- PostgreSQL database dump complete
--

\unrestrict c5CiKkpoM1liPWdssAmcgXo9IjGisP7a8H2imNBH9ZlcxJcRQZIDKwKI272jagc

