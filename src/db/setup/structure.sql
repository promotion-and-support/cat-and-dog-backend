--
-- PostgreSQL database dump
--

\restrict MBgtKkQcYQoQWZbrvija3RVCW8jQiEhddCZxN2j292au0IIMb5K7JFB1MClZPjN

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-12-07 15:25:51 EET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 238 (class 1259 OID 21949)
-- Name: events; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.events (
    event_id bigint NOT NULL,
    user_id bigint NOT NULL,
    net_id bigint,
    net_view character(10) DEFAULT NULL::bpchar,
    from_node_id bigint,
    event_type character(20) NOT NULL,
    message character varying(255) NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.events OWNER TO cat_and_dog;

--
-- TOC entry 239 (class 1259 OID 21959)
-- Name: events_event_id_seq; Type: SEQUENCE; Schema: public; Owner: cat_and_dog
--

ALTER TABLE public.events ALTER COLUMN event_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.events_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 21694)
-- Name: members; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.members (
    member_id integer NOT NULL,
    user_id integer,
    email_show boolean DEFAULT false NOT NULL,
    name_show boolean DEFAULT false NOT NULL,
    mobile_show boolean DEFAULT false NOT NULL,
    confirmed boolean DEFAULT false NOT NULL,
    active_date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.members OWNER TO cat_and_dog;

--
-- TOC entry 220 (class 1259 OID 21708)
-- Name: members_invites; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.members_invites (
    member_id integer NOT NULL,
    node_id integer NOT NULL,
    member_name character varying(50) NOT NULL,
    token character varying(255) NOT NULL
);


ALTER TABLE public.members_invites OWNER TO cat_and_dog;

--
-- TOC entry 221 (class 1259 OID 21715)
-- Name: members_to_members; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.members_to_members (
    branch_id integer NOT NULL,
    from_member_id integer NOT NULL,
    to_member_id integer NOT NULL,
    dislike boolean DEFAULT false NOT NULL,
    vote boolean DEFAULT false NOT NULL,
    replacing boolean DEFAULT false NOT NULL
);


ALTER TABLE public.members_to_members OWNER TO cat_and_dog;

--
-- TOC entry 222 (class 1259 OID 21727)
-- Name: messages; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.messages (
    subject character varying NOT NULL,
    content character varying NOT NULL,
    message_id integer NOT NULL,
    date timestamp with time zone NOT NULL
);


ALTER TABLE public.messages OWNER TO cat_and_dog;

--
-- TOC entry 223 (class 1259 OID 21736)
-- Name: nets; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.nets (
    net_id integer NOT NULL,
    net_level integer DEFAULT 0 NOT NULL,
    parent_net_id integer,
    root_net_id integer,
    count_of_nets integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.nets OWNER TO cat_and_dog;

--
-- TOC entry 224 (class 1259 OID 21744)
-- Name: nets_data; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.nets_data (
    net_id integer NOT NULL,
    name character varying(50) NOT NULL,
    goal text DEFAULT NULL::character varying,
    resource_name character varying(50) DEFAULT NULL::character varying,
    net_link character varying(255) DEFAULT NULL::character varying
);


ALTER TABLE public.nets_data OWNER TO cat_and_dog;

--
-- TOC entry 225 (class 1259 OID 21754)
-- Name: nets_guests; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.nets_guests (
    net_id integer NOT NULL,
    user_id integer NOT NULL,
    comment character varying(255) NOT NULL
);


ALTER TABLE public.nets_guests OWNER TO cat_and_dog;

--
-- TOC entry 226 (class 1259 OID 21760)
-- Name: nets_net_id_seq; Type: SEQUENCE; Schema: public; Owner: cat_and_dog
--

ALTER TABLE public.nets ALTER COLUMN net_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.nets_net_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 21761)
-- Name: nodes; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.nodes (
    node_id integer NOT NULL,
    node_level integer DEFAULT 0 NOT NULL,
    parent_node_id integer,
    net_id integer NOT NULL,
    node_position integer DEFAULT 0 NOT NULL,
    count_of_members integer DEFAULT 0 NOT NULL,
    updated timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.nodes OWNER TO cat_and_dog;

--
-- TOC entry 228 (class 1259 OID 21774)
-- Name: nodes_node_id_seq; Type: SEQUENCE; Schema: public; Owner: cat_and_dog
--

ALTER TABLE public.nodes ALTER COLUMN node_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.nodes_node_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 21775)
-- Name: roles; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO cat_and_dog;

--
-- TOC entry 230 (class 1259 OID 21782)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: cat_and_dog
--

ALTER TABLE public.roles ALTER COLUMN role_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 231 (class 1259 OID 21783)
-- Name: sessions; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.sessions (
    session_id integer NOT NULL,
    user_id integer NOT NULL,
    session_key character varying(255) NOT NULL,
    session_value character varying(255) NOT NULL,
    updated timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sessions OWNER TO cat_and_dog;

--
-- TOC entry 232 (class 1259 OID 21794)
-- Name: sessions_session_id_seq; Type: SEQUENCE; Schema: public; Owner: cat_and_dog
--

ALTER TABLE public.sessions ALTER COLUMN session_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sessions_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 233 (class 1259 OID 21795)
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.subscriptions (
    user_id integer NOT NULL,
    type character varying NOT NULL,
    sent_date timestamp with time zone DEFAULT now() NOT NULL,
    subject character varying NOT NULL,
    message_date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.subscriptions OWNER TO cat_and_dog;

--
-- TOC entry 234 (class 1259 OID 21807)
-- Name: users; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(50) DEFAULT NULL::character varying,
    name character varying(50) DEFAULT NULL::character varying,
    mobile character varying(50) DEFAULT NULL::character varying,
    password character varying(255) DEFAULT NULL::character varying,
    confirmed boolean DEFAULT false NOT NULL,
    chat_id character varying(50) DEFAULT NULL::character varying
);


ALTER TABLE public.users OWNER TO cat_and_dog;

--
-- TOC entry 240 (class 1259 OID 21978)
-- Name: users_events; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.users_events (
    user_id bigint NOT NULL,
    notification_date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users_events OWNER TO cat_and_dog;

--
-- TOC entry 235 (class 1259 OID 21818)
-- Name: users_roles; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.users_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.users_roles OWNER TO cat_and_dog;

--
-- TOC entry 236 (class 1259 OID 21823)
-- Name: users_tokens; Type: TABLE; Schema: public; Owner: cat_and_dog
--

CREATE TABLE public.users_tokens (
    user_id integer NOT NULL,
    token character varying(255) NOT NULL
);


ALTER TABLE public.users_tokens OWNER TO cat_and_dog;

--
-- TOC entry 237 (class 1259 OID 21828)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: cat_and_dog
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4655 (class 0 OID 21949)
-- Dependencies: 238
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.events (event_id, user_id, net_id, net_view, from_node_id, event_type, message, date) FROM stdin;
\.


--
-- TOC entry 4636 (class 0 OID 21694)
-- Dependencies: 219
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.members (member_id, user_id, email_show, name_show, mobile_show, confirmed, active_date) FROM stdin;
\.


--
-- TOC entry 4637 (class 0 OID 21708)
-- Dependencies: 220
-- Data for Name: members_invites; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.members_invites (member_id, node_id, member_name, token) FROM stdin;
\.


--
-- TOC entry 4638 (class 0 OID 21715)
-- Dependencies: 221
-- Data for Name: members_to_members; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.members_to_members (branch_id, from_member_id, to_member_id, dislike, vote, replacing) FROM stdin;
\.


--
-- TOC entry 4639 (class 0 OID 21727)
-- Dependencies: 222
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.messages (subject, content, message_id, date) FROM stdin;
\.


--
-- TOC entry 4640 (class 0 OID 21736)
-- Dependencies: 223
-- Data for Name: nets; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nets (net_id, net_level, parent_net_id, root_net_id, count_of_nets) FROM stdin;
\.


--
-- TOC entry 4641 (class 0 OID 21744)
-- Dependencies: 224
-- Data for Name: nets_data; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nets_data (net_id, name, goal, resource_name, net_link) FROM stdin;
\.


--
-- TOC entry 4642 (class 0 OID 21754)
-- Dependencies: 225
-- Data for Name: nets_guests; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nets_guests (net_id, user_id, comment) FROM stdin;
\.


--
-- TOC entry 4644 (class 0 OID 21761)
-- Dependencies: 227
-- Data for Name: nodes; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.nodes (node_id, node_level, parent_node_id, net_id, node_position, count_of_members, updated) FROM stdin;
\.


--
-- TOC entry 4646 (class 0 OID 21775)
-- Dependencies: 229
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.roles (role_id, name) FROM stdin;
\.


--
-- TOC entry 4648 (class 0 OID 21783)
-- Dependencies: 231
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.sessions (session_id, user_id, session_key, session_value, updated) FROM stdin;
\.


--
-- TOC entry 4650 (class 0 OID 21795)
-- Dependencies: 233
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.subscriptions (user_id, type, sent_date, subject, message_date) FROM stdin;
\.


--
-- TOC entry 4651 (class 0 OID 21807)
-- Dependencies: 234
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.users (user_id, email, name, mobile, password, confirmed, chat_id) FROM stdin;
\.


--
-- TOC entry 4657 (class 0 OID 21978)
-- Dependencies: 240
-- Data for Name: users_events; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.users_events (user_id, notification_date) FROM stdin;
\.


--
-- TOC entry 4652 (class 0 OID 21818)
-- Dependencies: 235
-- Data for Name: users_roles; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.users_roles (user_id, role_id) FROM stdin;
\.


--
-- TOC entry 4653 (class 0 OID 21823)
-- Dependencies: 236
-- Data for Name: users_tokens; Type: TABLE DATA; Schema: public; Owner: cat_and_dog
--

COPY public.users_tokens (user_id, token) FROM stdin;
\.


--
-- TOC entry 4663 (class 0 OID 0)
-- Dependencies: 239
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.events_event_id_seq', 1, false);


--
-- TOC entry 4664 (class 0 OID 0)
-- Dependencies: 226
-- Name: nets_net_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.nets_net_id_seq', 1, false);


--
-- TOC entry 4665 (class 0 OID 0)
-- Dependencies: 228
-- Name: nodes_node_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.nodes_node_id_seq', 1, false);


--
-- TOC entry 4666 (class 0 OID 0)
-- Dependencies: 230
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 1, false);


--
-- TOC entry 4667 (class 0 OID 0)
-- Dependencies: 232
-- Name: sessions_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.sessions_session_id_seq', 1, false);


--
-- TOC entry 4668 (class 0 OID 0)
-- Dependencies: 237
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cat_and_dog
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- TOC entry 4466 (class 2606 OID 21961)
-- Name: events pk_events; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT pk_events PRIMARY KEY (event_id);


--
-- TOC entry 4421 (class 2606 OID 21830)
-- Name: members pk_members; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT pk_members PRIMARY KEY (member_id);


--
-- TOC entry 4425 (class 2606 OID 21832)
-- Name: members_invites pk_members_invites; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_invites
    ADD CONSTRAINT pk_members_invites PRIMARY KEY (node_id);


--
-- TOC entry 4429 (class 2606 OID 21834)
-- Name: members_to_members pk_members_to_members; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_to_members
    ADD CONSTRAINT pk_members_to_members PRIMARY KEY (from_member_id, to_member_id, replacing);


--
-- TOC entry 4432 (class 2606 OID 21836)
-- Name: messages pk_messages; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT pk_messages PRIMARY KEY (message_id);


--
-- TOC entry 4434 (class 2606 OID 21838)
-- Name: nets pk_nets; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets
    ADD CONSTRAINT pk_nets PRIMARY KEY (net_id);


--
-- TOC entry 4436 (class 2606 OID 21840)
-- Name: nets_data pk_nets_data; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets_data
    ADD CONSTRAINT pk_nets_data PRIMARY KEY (net_id);


--
-- TOC entry 4438 (class 2606 OID 21842)
-- Name: nets_guests pk_nets_guests; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets_guests
    ADD CONSTRAINT pk_nets_guests PRIMARY KEY (net_id, user_id);


--
-- TOC entry 4442 (class 2606 OID 21844)
-- Name: nodes pk_nodes; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nodes
    ADD CONSTRAINT pk_nodes PRIMARY KEY (node_id);


--
-- TOC entry 4445 (class 2606 OID 21846)
-- Name: roles pk_roles; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT pk_roles PRIMARY KEY (role_id);


--
-- TOC entry 4447 (class 2606 OID 21848)
-- Name: sessions pk_sessions; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT pk_sessions PRIMARY KEY (session_id);


--
-- TOC entry 4449 (class 2606 OID 21850)
-- Name: subscriptions pk_subscriptions; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT pk_subscriptions PRIMARY KEY (user_id, subject);


--
-- TOC entry 4451 (class 2606 OID 21852)
-- Name: users pk_users; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (user_id);


--
-- TOC entry 4469 (class 2606 OID 21985)
-- Name: users_events pk_users_events; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_events
    ADD CONSTRAINT pk_users_events PRIMARY KEY (user_id);


--
-- TOC entry 4459 (class 2606 OID 21854)
-- Name: users_roles pk_users_roles; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT pk_users_roles PRIMARY KEY (user_id, role_id);


--
-- TOC entry 4461 (class 2606 OID 21856)
-- Name: users_tokens pk_users_tokens; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_tokens
    ADD CONSTRAINT pk_users_tokens PRIMARY KEY (user_id);


--
-- TOC entry 4453 (class 2606 OID 21858)
-- Name: users uk_chat_id; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_chat_id UNIQUE (chat_id);


--
-- TOC entry 4455 (class 2606 OID 21860)
-- Name: users uk_email; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_email UNIQUE (email);


--
-- TOC entry 4427 (class 2606 OID 21862)
-- Name: members_invites uk_members_invites_token; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_invites
    ADD CONSTRAINT uk_members_invites_token UNIQUE (token);


--
-- TOC entry 4463 (class 2606 OID 21864)
-- Name: users_tokens uk_users_tokens_token; Type: CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_tokens
    ADD CONSTRAINT uk_users_tokens_token UNIQUE (token);


--
-- TOC entry 4423 (class 1259 OID 21865)
-- Name: members_invites_token_idx; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE UNIQUE INDEX members_invites_token_idx ON public.members_invites USING btree (token);


--
-- TOC entry 4467 (class 1259 OID 21962)
-- Name: sk_events_user; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE INDEX sk_events_user ON public.events USING btree (user_id);


--
-- TOC entry 4430 (class 1259 OID 21866)
-- Name: sk_members_to_members_branch; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE INDEX sk_members_to_members_branch ON public.members_to_members USING btree (branch_id);


--
-- TOC entry 4422 (class 1259 OID 21867)
-- Name: sk_members_user; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE INDEX sk_members_user ON public.members USING btree (user_id);


--
-- TOC entry 4439 (class 1259 OID 21868)
-- Name: sk_nets_guests_net; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE INDEX sk_nets_guests_net ON public.nets_guests USING btree (net_id);


--
-- TOC entry 4440 (class 1259 OID 21869)
-- Name: sk_nets_guests_user; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE INDEX sk_nets_guests_user ON public.nets_guests USING btree (user_id);


--
-- TOC entry 4443 (class 1259 OID 21870)
-- Name: sk_nodes_parent_node; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE INDEX sk_nodes_parent_node ON public.nodes USING btree (parent_node_id NULLS FIRST);


--
-- TOC entry 4456 (class 1259 OID 21871)
-- Name: users_chat_idx; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE UNIQUE INDEX users_chat_idx ON public.users USING btree (chat_id);


--
-- TOC entry 4457 (class 1259 OID 21872)
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- TOC entry 4464 (class 1259 OID 21873)
-- Name: users_tokens_token_idx; Type: INDEX; Schema: public; Owner: cat_and_dog
--

CREATE UNIQUE INDEX users_tokens_token_idx ON public.users_tokens USING btree (token);


--
-- TOC entry 4485 (class 2606 OID 21963)
-- Name: events fk_events_from_node; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_events_from_node FOREIGN KEY (from_node_id) REFERENCES public.nodes(node_id) ON DELETE CASCADE;


--
-- TOC entry 4486 (class 2606 OID 21968)
-- Name: events fk_events_net; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_events_net FOREIGN KEY (net_id) REFERENCES public.nets(net_id);


--
-- TOC entry 4487 (class 2606 OID 21973)
-- Name: events fk_events_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_events_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4472 (class 2606 OID 21874)
-- Name: members_invites fk_members_invites_member; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_invites
    ADD CONSTRAINT fk_members_invites_member FOREIGN KEY (member_id) REFERENCES public.members(member_id) ON DELETE CASCADE;


--
-- TOC entry 4473 (class 2606 OID 21879)
-- Name: members_invites fk_members_invites_node; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_invites
    ADD CONSTRAINT fk_members_invites_node FOREIGN KEY (node_id) REFERENCES public.nodes(node_id);


--
-- TOC entry 4470 (class 2606 OID 21884)
-- Name: members fk_members_node; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT fk_members_node FOREIGN KEY (member_id) REFERENCES public.nodes(node_id);


--
-- TOC entry 4474 (class 2606 OID 21889)
-- Name: members_to_members fk_members_to_members_from_member; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_to_members
    ADD CONSTRAINT fk_members_to_members_from_member FOREIGN KEY (from_member_id) REFERENCES public.members(member_id) ON DELETE CASCADE;


--
-- TOC entry 4475 (class 2606 OID 21894)
-- Name: members_to_members fk_members_to_members_to_member; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members_to_members
    ADD CONSTRAINT fk_members_to_members_to_member FOREIGN KEY (to_member_id) REFERENCES public.members(member_id) ON DELETE CASCADE;


--
-- TOC entry 4471 (class 2606 OID 21899)
-- Name: members fk_members_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT fk_members_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4476 (class 2606 OID 21904)
-- Name: nets_data fk_nets_data_net; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets_data
    ADD CONSTRAINT fk_nets_data_net FOREIGN KEY (net_id) REFERENCES public.nets(net_id) ON DELETE CASCADE;


--
-- TOC entry 4477 (class 2606 OID 21909)
-- Name: nets_guests fk_nets_guests_net; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets_guests
    ADD CONSTRAINT fk_nets_guests_net FOREIGN KEY (net_id) REFERENCES public.nets(net_id) ON DELETE CASCADE;


--
-- TOC entry 4478 (class 2606 OID 21914)
-- Name: nets_guests fk_nets_guests_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nets_guests
    ADD CONSTRAINT fk_nets_guests_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4479 (class 2606 OID 21919)
-- Name: nodes fk_nodes_net; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.nodes
    ADD CONSTRAINT fk_nodes_net FOREIGN KEY (net_id) REFERENCES public.nets(net_id);


--
-- TOC entry 4480 (class 2606 OID 21924)
-- Name: sessions fk_sessions_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4481 (class 2606 OID 21929)
-- Name: subscriptions fk_subscribtions_users; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT fk_subscribtions_users FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4488 (class 2606 OID 21986)
-- Name: users_events fk_users_events_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_events
    ADD CONSTRAINT fk_users_events_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4482 (class 2606 OID 21934)
-- Name: users_roles fk_users_roles_role; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT fk_users_roles_role FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON DELETE CASCADE;


--
-- TOC entry 4483 (class 2606 OID 21939)
-- Name: users_roles fk_users_roles_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT fk_users_roles_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4484 (class 2606 OID 21944)
-- Name: users_tokens fk_users_tokens_user; Type: FK CONSTRAINT; Schema: public; Owner: cat_and_dog
--

ALTER TABLE ONLY public.users_tokens
    ADD CONSTRAINT fk_users_tokens_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2025-12-07 15:25:51 EET

--
-- PostgreSQL database dump complete
--

\unrestrict MBgtKkQcYQoQWZbrvija3RVCW8jQiEhddCZxN2j292au0IIMb5K7JFB1MClZPjN

