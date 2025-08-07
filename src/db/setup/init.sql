--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

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
-- Data for Name: nets; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nets (net_id, net_level, parent_net_id, root_net_id, count_of_nets) FROM stdin;
\.


--
-- Data for Name: nodes; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nodes (node_id, node_level, parent_node_id, net_id, node_position, count_of_members, updated) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.users (user_id, email, name, mobile, password, confirmed, chat_id) FROM stdin;
\.


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.members (member_id, user_id, email_show, name_show, mobile_show, confirmed, active_date) FROM stdin;
\.


--
-- Data for Name: members_invites; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.members_invites (member_id, node_id, member_name, token) FROM stdin;
\.


--
-- Data for Name: members_to_members; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.members_to_members (branch_id, from_member_id, to_member_id, dislike, vote, replacing) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.messages (subject, content, message_id, date) FROM stdin;
\.


--
-- Data for Name: nets_data; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nets_data (net_id, name, goal, resource_name, net_link) FROM stdin;
\.


--
-- Data for Name: nets_guests; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nets_guests (net_id, user_id, comment) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.roles (role_id, name) FROM stdin;
1	ADMIN
2	OWNER
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.sessions (session_id, user_id, session_key, session_value, updated) FROM stdin;
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.subscriptions (user_id, type, sent_date, subject, message_date) FROM stdin;
\.


--
-- Data for Name: users_roles; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.users_roles (user_id, role_id) FROM stdin;
\.


--
-- Data for Name: users_tokens; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.users_tokens (user_id, token) FROM stdin;
\.


--
-- Name: nets_net_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.nets_net_id_seq', 1, false);


--
-- Name: nodes_node_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.nodes_node_id_seq', 1, false);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 2, true);


--
-- Name: sessions_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.sessions_session_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

